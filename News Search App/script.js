//  Api to get news from newsapi.com
const apikey = '12149d20832f4895897705915ba71338';

const blogContainer =document.getElementById("blogContainer");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Fetching data from api
async function fetchRandomNews(){
    try{
        const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        console.log(data.articles);
        return data.articles;
    }
    catch(error){
        console.error("Error Fetching Random News", error); 
    }
}


//  Js to get element 
function displayBlogs(articles){
    blogContainer.innerHTML="";
    articles.forEach((article)=>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog_Card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30? article.title.slice(0,30) + " ...." :
        article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDes = article.description.length > 120? article.description.slice(0,120) + " ...." :
        article.description;
        description.textContent = article.description;
        // 
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener(
            "click",
            ()=>{
                window.open(article.url, "_blank");
            });
        blogContainer.appendChild(blogCard);
    });
}


(async()=>{
    try{
        const article = await fetchRandomNews()
        displayBlogs(article);
    }
    catch(error){

    }
})();