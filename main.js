let news = [];
let buttons = document.querySelectorAll(".button-area");


buttons.forEach((button)=> button.addEventListener("click", (event) => getNewsByTopic(event)));
let searchButton = document.getElementById("search-button");


const getLatestNews = async() => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=news&page_size=10`);
    let header = new Headers({'x-api-key':'3yI0QKleeH3TkLP3gbdP1wvZsA_HVvBBC__CvWr2UVM'});

    let response = await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles;
    console.log(news);

    render();
}

const getNewsByTopic = async(event) => {
    console.log(event.target.textContent);
    let topic = event.target.textContent.toLowerCase();
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`);
    let header = new Headers({'x-api-key':'3yI0QKleeH3TkLP3gbdP1wvZsA_HVvBBC__CvWr2UVM'});

    let response = await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles;

    render();
}

const getNewsByKeyword = async() => {
    let keyword = document.getElementById("search-input").value
    let url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
    let header = new Headers({'x-api-key':'3yI0QKleeH3TkLP3gbdP1wvZsA_HVvBBC__CvWr2UVM'});
    let response = await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles;
    
    render();
}

const render = () => {
    let newsHTML = '';
    newsHTML = news.map((item) => {
        return `<div class="row news">
        <div class="col-lg-4">
            <img src="${item.media}" alt="" class="news-img-size">
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>${item.summary}</p>
            <div>${item.rights} * ${item.published_date}</div>
        </div>
    </div>`;
    }).join('');

    console.log(newsHTML);
    document.getElementById("news-board").innerHTML = newsHTML;
};

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();