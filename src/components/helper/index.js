import cheerio from 'cheerio';

export const alphaNumerics_top3 = dom => {

    const res = dom.match(/([a-zA-z]+[\d]+)|([\d]+[a-zA-z]+)/g);
    const obj = {};

    // count repetitions of alphanumerics
    res.forEach(item => {
        if (obj[item] >= 0) {
            obj[item] = obj[item] + 1;

        } else {
            obj[item] = 1;
        }
    })

    // new array to hold alphanumerics count
    let newArr = [];

    for (let temp in obj) {
        newArr.push({ alpha: temp, count: obj[temp] })
    }

    // Organized array by count value 
    var sortedArr = newArr.sort((current, next) => next.count - current.count);
    console.log('== sorted array ===========')

    let topThree = [sortedArr[0], sortedArr[1], sortedArr[2]]

    return topThree;
}

export const pngCount = dom => {
    return dom.match(/.png/g);
}

export const financialCount = dom => {
    return dom.match(/financial institution/g).length;
}

export const productCount = dom => {
    const $ = cheerio.load(dom);

    // Array to hold products found on the page
    const products = [];

    $('#sub-menu').children('li').each((i, item) => {

        products.push($(item).find('span').text().trim());

    })

    return products.length;
}

export const findTwitterHandle = dom => {
    const $ = cheerio.load(dom);

    let twitterHandle;

    $('.footer-column').each((i, item) => {
        let liArr = $(item).find('li');
        $(liArr).each((i, item) => {

            let linkText = $(item).children('a').html()

            if (linkText === 'Twitter') {
                console.log('Found it !')
                twitterHandle = $(item).children('a').attr('href');

            }
        })
    });
    return twitterHandle;
}