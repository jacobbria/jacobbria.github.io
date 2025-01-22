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
        
        // parse/format blog content with Marked Library
        const formattedContent = marked.parse(blogContent); 
        
        // Create  card
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
           <div class="title_container">
              <div class="title_section">
                <h3 class="title_blog">${title}</h3>
              </div>
              <div class="icon_container">
                <span class="toggle_icon"><i class="fas fa-chevron-down"></i></span>
              </div>
          </div>
          <p><strong>Date Posted:</strong> ${new Date(datePosted).toDateString()}</p>
          <div class="content hidden" id="content"> <p>${formattedContent}</p> </div>
        `;
  
        // Append card to blog page
        cardsContainer.appendChild(card);

        
      // Control Expand Icon and content when clicked
      const toggleIcon = document.querySelector('.toggle_icon');
      const contentDiv = document.querySelector('.content');

      toggleIcon.addEventListener('click', () => {
        console.log("Rotate clicked!");
        toggleIcon.classList.toggle('rotated');  // Toggle the 'rotated' class on click
        contentDiv.classList.toggle('hidden');
      });
      
    });
    })
    .catch(error => console.error('Error fetching Contentful data:', error));

      
  