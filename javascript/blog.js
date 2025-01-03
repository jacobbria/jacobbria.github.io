// Retrieves navbar 
fetch('../html/components/nav_bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav_bar').innerHTML = data;
    })
    .catch(error => console.error('Error loading the navbar:', error));