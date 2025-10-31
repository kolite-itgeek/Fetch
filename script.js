
async function fetchUsersAndSummarize() {
  const url = 'https://jsonplaceholder.typicode.com/users';

  return fetch(url)
    // Chain 1... to check response and throw if status is NOT 200
    .then(response => {

      if (response.status !== 200) {

        throw new Error(`Fetch failed: status code ${response.status}`);
      }
      // Response is good/ok... return response to next chain
      return response;
    })

    
    .then(response => response.json())
   
    
    .then(users => {

         // Declearing user variable to filter users living in city that starts with 'C'
      const usersInC = users
        .filter(user => {

          // protect against missing fields defensively
          if (!user || !user.address || !user.address.city) return false;
          return String(user.address.city).startsWith('C');
        })
        // converting everything to small object: { id, name, companyName }
        .map(user => ({
          id: user.id,
          name: user.name,
          companyName: user.company ? user.company.name : 'N/A'
        }));

      // logging output of each user(converted)
      usersInC.forEach(u => {
        console.log(`User ID ${u.id}: ${u.name} works at ${u.companyName}`);
      });

      return usersInC;
    })
    // Error catch(general) for the whole chain (network, parsing, thrown errors)
    .catch(error => {
      console.error('Error in fetchUsersAndSummarize:', error);
    });
}

//Test Error function to catch all invalid endpoint
function testError() {
  // for invalid url
  const badUrl = 'https://jsonplaceholder.typicode.com/u5ers';
  fetch(badUrl)
    .then(response => {
      
      if (response.status !== 200) {
        throw new Error(`Bad URL request failed: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Unexpected success:', data);
    })
    .catch(err => {
      // For network errors, non-200 statuses
      console.error('testError caught an error as expected:', err);
    });
}

fetchUsersAndSummarize();

testError();