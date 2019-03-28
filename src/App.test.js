import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import App from './App';
import Card from './components/Card';

const app = shallow(<App />);

describe('App', () => {

    describe('renders correctly', () => {

        it('it looks the same as snapshot', () => {
            expect(app).toMatchSnapshot();
        })
    });

    describe('renders five <Card/> components ', () => {
        expect(app.find(Card)).toHaveLength(5)
    })

    describe('Checking Initial State', () => {


        it('initializes the `state` with an empty list of alphaNumerics', () => {
            expect(app.state().alphaNumerics).toEqual([]);
        })

        it('initializes the `state` with an empty string for twitterHandle ', () => {
            expect(app.state().twitterHandle).toEqual('');
        })

        it('initializes the `state` with an empty string for link ', () => {
            expect(app.state().link).toEqual('');
        })

        it('initializes the `state` with  0 for pngCount', () => {
            expect(app.state().pngCount).toEqual(0);
        })


        it('initializes the `state` with  0 for productCount', () => {
            expect(app.state().productCount).toEqual(0);
        })
    })



    // describe('when clicking the `add-gift` button', () => {

    //     const id = 1;

    //     beforeEach(() => {
    //         app.find('.btn-add').simulate('click');
    //     });

    //     afterEach(() => {
    //         app.setState({ gifts: [] })
    //     });
    //     it('adds a new gift to `state` ', () => {
    //         expect(app.state().gifts).toEqual([{ id: 1 }])
    //     });

    //     it('adds a new gift to the rendered list ', () => {
    //         expect(app.find('.gift-list').children().length).toEqual(1);
    //     });

    //     it('Creates a Gift component', () => {
    //         expect(app.find('Gift').exists()).toBe(true);
    //     });

    //     describe('and the user wants to remove the added gift', () => {
    //         beforeEach(()=> {
    //             app.instance().removeGift(id);
    //         });

    //         it('removes the gift from `state`', () => {
    //             expect(app.state().gifts).toEqual([]);
    //         });
    //     });

    // });


})
