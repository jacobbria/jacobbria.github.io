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
  client.getEntries({ content_type: 'resumeBlogPost' })
  .then(response => {
    const articles = response.items;
    const cardsContainer = document.getElementById('cards-container');

    articles.forEach(article => {
      const { title, datePosted, blogContent } = article.fields;
      const formattedContent = marked.parse(blogContent);

      // Create card element
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
        <div class="content hidden" id="content" >
          <p>${formattedContent}</p>
        </div>
      `;

      // Append card to the container
      cardsContainer.appendChild(card);

      // Set up event listener for the toggle icon
      const toggleIcon = card.querySelector('.toggle_icon');
      const contentDiv = card.querySelector('.hidden');

      toggleIcon.addEventListener('click', () => {
        toggleIcon.classList.toggle('rotated');
        contentDiv.classList.toggle('hidden'); /* <-- this affects the hidden class to help prevent 2x clicks */
        
      });
    });
  })
  .catch(error => console.error('Error fetching Contentful data:', error));
