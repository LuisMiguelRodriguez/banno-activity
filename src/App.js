import React, { Component } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import cheerio from 'cheerio';
import axios from 'axios';
import Card from './components/Card';
import { alphaNumerics_top3, pngCount, financialCount, productCount, findTwitterHandle } from './components/helper';

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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios(proxyurl + 'http://www.banno.com')
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
    const topAlphaNumerics = alphaNumerics_top3(dom)

    this.setState({ alphaNumerics: topAlphaNumerics })

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
    this.setState({ pngCount: pngCount(dom) })

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
    this.setState({ financialIntCount: financialCount(dom) })

  }

  /**
   *
   * @method handleProductCount
   * @description - Searches for products on page by looking under the a dropdown menu which holds all a list of products.
   * @memberof App
   */
  handleProductCount = () => {
    this.setState({ productCount: productCount(this.state.data) })
  }

  /**
   *
   * @method handleTwitterHandle 
   * @description - Locates the twitter handle in the footer by looking through the li tags.
   * @memberof App
   */
  handleTwitterHandle = () => {

    this.setState({ twitterHandle: findTwitterHandle(this.state.data) })

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
