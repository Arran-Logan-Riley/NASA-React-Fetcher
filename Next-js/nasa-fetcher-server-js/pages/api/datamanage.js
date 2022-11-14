import * as dotenv from 'dotenv';
let nasaKey = process.env.NASAKEY;


class Card {
    constructor(dataUrl, position) {
        this.fetchFromUrl(dataUrl, position);
    }

    async fetchFromUrl(dataUrl, position) {
        async function fetchAsync() {
            let response = await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${nasaKey}`);
            let data = await response.json();
            return data;
           
            //console.log(data[0].date);
            // console.log(data[position]);
            //String cheese to construct a link that goes to the latest picture of the earth from the L1 point
            // var urlLink = stringCheese(data, position);

        }
        fetchAsync().then(data => this.cardDate = data[0].date)
        fetchAsync().then(data => this.caption = data[0].caption)
        // TODO: Generate url using string cheese.
        fetchAsync().then(data => this.imageUrl =`https://api.nasa.gov/EPIC/archive/natural/2022/03/16/png/epic_1b_20220316001752.png?api_key=${nasaKey}`)

    }

    setDatedate(date) {
        this.cardDate = cardDate;
    }

    setCaption(caption) {
        this.caption = caption;
    }

    setUrl(url) {
        this.imageUrl = url;
    }
}


class CardController {
    constructor() {
        this.cards = new Card(`https://api.nasa.gov/EPIC/api/natural?api_key=${nasaKey}`, 0)
    }
}

let cardSet = new CardController();

// Send toSend object to user as "sendData".
export default function handler(req, res) {
    // console.log(Object.keys(cardSet))
    // console.log(`Sent ${JSON.stringify(cardSet.cards)}`)
    res.status(200).json({ sendData: cardSet.cards })
}



function stringCheese(obj, position) {
    // (PIUF - Position image url finder).
    // Create request URL to NASA. Should later be changed to serve links to local cached images.
    const source0 = "https://api.nasa.gov/EPIC/archive/natural/"
    const apiKey = `api_key=${nasaKey}`
    var imgUrl = ""
    var url = [];
    var identifier = obj[position].image;
    var date = obj[position].date;
    //cutting the unessasary data points out of the string
    date = date.slice(0, -9);
    //replacing slashes with dashes
    date = date.split('-').join('/');
    //adding the data to an array
    url.push(identifier, date)
    //Create the hyperlink that goes to the image
    imgUrl = source0 + url[1] + "/" + "png/" + url[0] + ".png?" + apiKey
    //console.log(imgUrl);
    return imgUrl;
};