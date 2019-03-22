import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import cheerio from 'cheerio';
import axios from 'axios';
import Card from './components/Card';

class App extends Component {

  state = {
    link: '',
    data: '',
    alphaNumerics: [],
    pngCount: 0,
    financialIntCount: 0,
    twitterHandle: '',
    productCount: 0
  }

  getDom = () => {

    axios('http://www.banno.com')
      .then(({ data }) => {

        this.setState({ data })
      })
      .catch(err => console.log(err))

  }

  componentDidMount() {
    this.getDom();

  }


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

  handlePngCount = () => {

    const $ = cheerio.load(this.state.data);
    const dom = $('body').html();

    // .png count

    let pngCount = dom.match(/.png/g);
    console.log('png count : ', pngCount.length)
    this.setState({ pngCount })

  }

  handleFinancialCount = () => {

    const $ = cheerio.load(this.state.data);
    const dom = $('body').html();


    let financialIntCount = dom.match(/financial institution/g);
    this.setState({ financialIntCount: financialIntCount.length })
    console.log('financial int count : ', financialIntCount.length)
  }

  handleProductCount = () => {

    const $ = cheerio.load(this.state.data);
    const dom = $('body').html();

    // Array to hold products found on the page
    const products = [];

    $('#sub-menu').children('li').each((i, item) => {

      products.push($(item).find('span').text().trim());

    })

    let productCount = products.length;

    console.log('Current Products Listed ', products)
    this.setState({ productCount })
  }

  handleTwitterHandle = () => {

    const $ = cheerio.load(this.state.data);
    const dom = $('body').html();

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
        <Card onClickHandler={this.handleAlphaNumerics} activity={'Alpha Numeric Top 3'} array={this.state.alphaNumerics} />
        <Card onClickHandler={this.handlePngCount} activity={'PNG Count'} result={this.state.pngCount.length} />
        <Card onClickHandler={this.handleFinancialCount} activity={'Count of Financial Instituation '} result={this.state.financialIntCount} />
        <Card onClickHandler={this.handleProductCount} activity={'Count of Products'} result={this.state.productCount} />
        <Card onClickHandler={this.handleTwitterHandle} activity={'Locate Twittle Handle Dynamically'} result={this.state.twitterHandle} />
      </div>
    );
  }

}

export default App;
