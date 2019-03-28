import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { shallow, render } from 'enzyme';
import CardC from './Card';
import { ToggleButton } from 'react-bootstrap';
import { tsImportEqualsDeclaration } from '@babel/types';
import { Card, Button, ProgressBar, CardColumns } from 'react-bootstrap';


describe('Card', () => {
    // const mockRemove = jest.fn();
    const activity = 'Alpha Numeric Top 3';
    const props = { activity: activity, result: 10 };
    const card = shallow((<CardC {...props} />));
    const arrData = [{
        alpha: 'test2', count: 30
    }, { alpha: 'test3', count: 20 },
    { alpha: 'test3', count: 10 }]
    const cardArr = shallow((<CardC array={arrData} />));

    it('renders properly', () => {
        expect(Card).toMatchSnapshot();
    });

    it('renders correct text in item', () => {
        //Expect the child of the first item to be an array
        expect(card.find('.test-title')).toBeTruthy();
    });

    it('renders activity', () => {
        //Expect the child of the first item to be an array
        expect(card.find(Card.Title).html()).toEqual('<div class="test-title card-title h5">Activity - Alpha Numeric Top 3</div>');
    });

    it('renders button to run activity', () => {
        //Expect the child of the first item to be an array
        expect(card.find(Button).html()).toEqual('<button type="button" class="btn btn-primary">Run Activity</button>');
    });

    it('renders results to footer', () => {
        //Expect the child of the first item to be an array
        expect(card.find(Card.Footer).html()).toEqual('<div class="text-primary card-footer">10</div>');
    });

    it('renders 4 Card.Footer Components for results', () => {
        //Expect the child of the first item to be an array
        expect(cardArr.find(Card.Footer)).toHaveLength(4)
    });

    it('renders results from array with value 30, 20 , 10', () => {
        //Expect the child of the first item to be an array
        const texts = cardArr.find(Card.Footer).map(node => node.text());
        expect(texts).toEqual(["", "AlphaNumeric: test2  Count: 30", "AlphaNumeric: test3  Count: 20", "AlphaNumeric: test3  Count: 10"])
    });


});