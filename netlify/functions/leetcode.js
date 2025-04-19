exports.handler = async function (event, context) {
    try {
      const body = JSON.parse(event.body);
  
      const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com',
          'User-Agent': 'Mozilla/5.0',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`LeetCode API error: ${response.status}`);
      }
  
      const data = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message }),
      };
    }
  };
  