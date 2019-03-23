import React, { Component } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import cheerio from 'cheerio';
import axios from 'axios';
import Card from './components/Card';

/**
 * 
 * App Component
 */
class App extends Component {


  /**
   * @property { String } link - Link to be used for webscraping.
   * @property { string } data - Holds html from dom to be searched through.
   * @property { Array }  alphaNumerics - An array that will hold the top 3 alphnumerics found.
   * @property { Number } pngCount - A Count of PNG image found on the page.
   * @property { Number } financialIntCount - A count of how many times financial institute shows on the page.
   * @property { String } twitterHandle - Twitter Handle .
   * @property { Number } productCount - A count of products found on the page.
   * @memberof App
   */

  state = {
    link: '',
    data: '',
    alphaNumerics: [],
    pngCount: 0,
    financialIntCount: 0,
    twitterHandle: '',
    productCount: 0
  }

  /**
   *
   * @function getDom
   * @method - Makes an Axios request to retreive the html from the specified link.
   * @memberof App
   */
  getDom = () => {

    axios('http://www.banno.com')
      .then(({ data }) => {

        this.setState({ data })
      })
      .catch(err => console.log(err))

  }

  /**
   *
   * @method componentDidMount
   * @description - On initial load componentDidMout will call the method getDom() to retreive the html from the link specified.
   * @memberof App
   */
  componentDidMount() {
    this.getDom();

  }

  /**
   *
   * @method handleAlphaNumerics
   * @description - This method does a search for all alphanumerics on the page using a regex expression.
   * @memberof App
   */
  handleAlphaNumerics = () => {

    const $ = cheerio.load(this.state.data);
    const dom = $('body').html();

    // look only for alphanumeric 
    const res = dom.match(/([a-zA-z]+[\d]+)|([\d]+[a-zA-z]+)/g);
    const obj = {};

    // count repetitions of alphanumerics
    res.forEach(item => {
      if (obj[item] >= 0) {
        obj[item] = obj[item] + 1;

      } else {
        obj[item] = 0;
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
    this.setState({ alphaNumerics: topThree })
    // Log top 3 highest count
    console.log('#1 ', sortedArr[0])
    console.log('#2 ', sortedArr[1])
    console.log('#3 ', sortedArr[3])
    console.log(this.state.alphaNumerics)
  }

  /**
   *
   * @method handlePngCount
   * @description - This method does a search for all .png occurences on the pages and keeps a count.
   * @memberof App
   */
  handlePngCount = () => {

    const $ = cheerio.load(this.state.data);
    const dom = $('body').html();

    // .png count

    let pngCount = dom.match(/.png/g);
    console.log('png count : ', pngCount.length)
    this.setState({ pngCount })

  }

  /**
   *
   * @method handleFinancialCount
   * @description - Searches page for all occurences of `financial institution` with a regex expression and keeps a count.
   * @memberof App
   */
  handleFinancialCount = () => {

    const $ = cheerio.load(this.state.data);
    const dom = $('body').html();


    let financialIntCount = dom.match(/financial institution/g);
    this.setState({ financialIntCount: financialIntCount.length })
    console.log('financial int count : ', financialIntCount.length)
  }

  /**
   *
   * @method handleProductCount
   * @description - Searches for products on page by looking under the a dropdown menu which holds all a list of products.
   * @memberof App
   */
  handleProductCount = () => {

    const $ = cheerio.load(this.state.data);
    // const dom = $('body').html();

    // Array to hold products found on the page
    const products = [];

    $('#sub-menu').children('li').each((i, item) => {

      products.push($(item).find('span').text().trim());

    })

    let productCount = products.length;

    console.log('Current Products Listed ', products)
    this.setState({ productCount })
  }

  /**
   *
   * @method handleTwitterHandle 
   * @description - Locates the twitter handle in the footer by looking through the li tags.
   * @memberof App
   */
  handleTwitterHandle = () => {

    const $ = cheerio.load(this.state.data);
    // const dom = $('body').html();

    // Find twitter handle
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

      console.log('== Twitter Handle =========');
      console.log(twitterHandle);
      this.setState({ twitterHandle })
    })


  }

  render() {
    return (
      <div className="App">
        <Container>
          <Jumbotron style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Banno Assignment</h1>
          </Jumbotron>
          <Card onClickHandler={this.handleAlphaNumerics} activity={'Alpha Numeric Top 3'} array={this.state.alphaNumerics} />
          <Card onClickHandler={this.handlePngCount} activity={'PNG Count'} result={this.state.pngCount.length} />
          <Card onClickHandler={this.handleFinancialCount} activity={'Count of Financial Instituation '} result={this.state.financialIntCount} />
          <Card onClickHandler={this.handleProductCount} activity={'Count of Products'} result={this.state.productCount} />
          <Card onClickHandler={this.handleTwitterHandle} activity={'Locate Twittle Handle Dynamically'} result={this.state.twitterHandle} />
        </Container>
      </div>
    );
  }

}

export default App;
