import React, { useState, useEffect } from 'react';
import './Leetcode.css';

const LeetCodeProblemFetcher = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const limit = 50;

  const fetchProblems = async (skip = 0) => {
    setLoading(true);
    
    const query = `
      query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList: questionList(
          categorySlug: $categorySlug
          limit: $limit
          skip: $skip
          filters: $filters
        ) {
          total: totalNum
          questions: data {
            acRate
            difficulty
            freqBar
            frontendQuestionId: questionFrontendId
            isFavor
            paidOnly: isPaidOnly
            status
            title
            titleSlug
            topicTags {
              name
              id
              slug
            }
            hasSolution
            hasVideoSolution
          }
        }
      }
    `;

    const variables = {
      categorySlug: "",
      skip: skip,
      limit: limit,
      filters: {
        tags: ["linked-list"]
      }
    };

    try {
      const response = await fetch('/api/leetcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      
      setProblems(data.data.problemsetQuestionList.questions);
      setTotalProblems(data.data.problemsetQuestionList.total);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems(page * limit);
  }, [page]);

  const handleNextPage = () => {
    if ((page + 1) * limit < totalProblems) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // Define difficulty class
  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'difficulty-easy';
      case 'Medium':
        return 'difficulty-medium';
      case 'Hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="leetcode-container">
      <h1 className="title">LeetCode Problems</h1>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-text">Loading problems...</div>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="problems-table">
              <thead>
                <tr className="table-header">
                  <th className="header-id">ID</th>
                  <th className="header-title">Title</th>
                  <th className="header-difficulty">Difficulty</th>
                  <th className="header-acceptance">Acceptance Rate</th>
                  <th className="header-tags">Tags</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <tr key={problem.frontendQuestionId} className="table-row">
                    <td className="table-cell cell-id">{problem.frontendQuestionId}</td>
                    <td className="table-cell cell-title">
                      <div className="title-container">
                        <a 
                          href={`https://leetcode.com/problems/${problem.titleSlug}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="problem-link"
                        >
                          {problem.title}
                        </a>
                        {problem.paidOnly && (
                          <span className="premium-tag">Premium</span>
                        )}
                      </div>
                    </td>
                    <td className={`table-cell cell-difficulty ${getDifficultyClass(problem.difficulty)}`}>
                      {problem.difficulty}
                    </td>
                    <td className="table-cell cell-acceptance">
                      {parseFloat(problem.acRate).toFixed(1)}%
                    </td>
                    <td className="table-cell">
                      <div className="tags-container">
                        {problem.topicTags.map((tag) => (
                          <span key={tag.id} className="tag">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-container">
            <div className="pagination-info">
              Showing {page * limit + 1} - {Math.min((page + 1) * limit, totalProblems)} of {totalProblems} problems
            </div>
            <div className="pagination-buttons">
              <button 
                onClick={handlePrevPage} 
                disabled={page === 0}
                className="pagination-button"
              >
                Previous
              </button>
              <button 
                onClick={handleNextPage} 
                disabled={(page + 1) * limit >= totalProblems}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeetCodeProblemFetcher;