// Retrieves navbar 
fetch('../html/components/nav_bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav_bar').innerHTML = data;
    })
    .catch(error => console.error('Error loading the navbar:', error));

// Retrieve and then render blog content from Contenful
    // Initialize Contentful client
const client = contentful.createClient({ // <-- instantiates contentful object via CDN
    space: '2zynx1qhiyas', 
    accessToken: 'ThGs2LPiO9dDkaeckwrgv27eLelE3SZr4cP-cl6066g' 
  });

  // Fetch entries "Blog Post"
  client.getEntries({ content_type: 'resumeBlogPost' }) // <-- retrieves JSON object from API
    .then(response => {
      const articles = response.items;
      const cardsContainer = document.getElementById('cards-container');
  
      articles.forEach(article => {
        const { title, datePosted, blogContent } = article.fields;
        
        // parse/format blog content with Marked Lib
        const formattedContent = marked.parse(blogContent); 
        
        // Create  card
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${title}</h3>
          <p><strong>Date Posted:</strong> ${new Date(datePosted).toDateString()}</p>
          <div class="content"> <p>${formattedContent}</p> </div>
        `;
  
        // Append card to blog page
        cardsContainer.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching Contentful data:', error));
  