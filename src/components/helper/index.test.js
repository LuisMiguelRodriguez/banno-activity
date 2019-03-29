import { alphaNumerics_top3, pngCount, financialCount, productCount, findTwitterHandle } from './index';

describe('alphaNumerics_top3', () => {
    describe('given a string with alphanumeric numbers ', () => {
        it('returns an object with top 3 alpha numerics with count and the alphanumeric', () => {
            expect(alphaNumerics_top3('0c 0c 0c w3 w3 w3 w3 w3 alpha3 alpha3'))
                .toEqual([{ alpha: 'w3', count: 5 }, { alpha: '0c', count: 3 }, { alpha: 'alpha3', count: 2 }])
        })
    })
})

describe('pngCount', () => {
    describe('given a string of 10', () => {
        it('return a count of 10', () => {
            expect(pngCount('somePic.png somePic.png somePic.png somePic.png somePic.png somePic.png somePic.png somePic.png somePic.png somePic.png').length)
                .toEqual(10)
        })
    })
})

describe('financialCount', () => {
    describe('give a string with multiple occurences of financial institution', () => {
        it('should return 4 ', () => {
            expect(financialCount('financial institution blah blahfinancial institution blah financial institution hi hello how are youfinancial institution  '))
                .toEqual(4)
        })
    })
})

describe('productCount', () => {
    describe('given some html it will traverse the nav to find products available', () => {
        it('Should return 2 ', () => {
            expect(productCount(`<nav class="global-nav" role="navigation">
            <ul role="menubar">
              <li role="menuitem">
                <a href="/who-is-banno/">Who is Banno?</a>
              </li>
              <li role="menuitem" aria-expanded="true">
                <a href="#" aria-haspopup="true" aria-owns="sub-menu" id="web-menu-dropdown">
                  Products
                  <span class="caret"></span>
                </a>
                <ul id="sub-menu" role="menu" aria-hidden="false" aria-labelledby="web-menu-dropdown">
                  <li role="menuitem">
                    <a href="/digital-banking-suite/" tabindex="0">
                      <span>
                        Digital Banking Suite
                        <svg width="7px" height="11px" viewBox="0 0 7 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <defs></defs>
                            <g id="Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Link-Rollover" transform="translate(-930.000000, -315.000000)" fill="#3AAEDA">
                                    <g id="Group-3" transform="translate(695.000000, 71.000000)">
                                        <g id="Group-2-Copy" transform="translate(46.000000, 235.000000)">
                                            <g id="ic_keyboard_arrow_right_off-copy-2" transform="translate(189.000000, 9.000000)">
                                                <polygon id="Shape" points="0.195567133 9.44494048 4.03208605 5.68824405 0.195567133 1.93154762 1.37667885 0.777529762 6.40268616 5.68824405 1.37667885 10.5989583"></polygon>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                      </span>
                      <p>Complete, branded and user-friendly banking apps that come with a customer support tool unmatched by anyone in the industry.</p>
                    </a>
                  </li>
                  <li role="menuitem">
                    <a href="/website-products/" tabindex="0">
                      <span>
                        Website Products
                        <svg width="7px" height="11px" viewBox="0 0 7 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <defs></defs>
                            <g id="Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Link-Rollover" transform="translate(-930.000000, -315.000000)" fill="#3AAEDA">
                                    <g id="Group-3" transform="translate(695.000000, 71.000000)">
                                        <g id="Group-2-Copy" transform="translate(46.000000, 235.000000)">
                                            <g id="ic_keyboard_arrow_right_off-copy-2" transform="translate(189.000000, 9.000000)">
                                                <polygon id="Shape" points="0.195567133 9.44494048 4.03208605 5.68824405 0.195567133 1.93154762 1.37667885 0.777529762 6.40268616 5.68824405 1.37667885 10.5989583"></polygon>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                      </span>
                      <p>Beautiful, custom websites with an easy-to-use content management system and add-ons like Banno Marketing™ and Banno Monitor™.</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li role="menuitem">
                <a href="https://banno.com/a/">Sign into account</a>
              </li>
              <li role="menuitem">
                <button type="button" class="btn btn--primary open-modal" aria-controls="contactModal">Connect with us</button>
              </li>
            </ul>
          </nav>`))
                .toEqual(2);
        })
    })
})

describe('findTwitterHandle', () => {
    describe('given some html it will traverse the foot to find twitter handle', () => {
        expect(findTwitterHandle(`<div class="container">
		<div class="footer-columns">
			<div class="footer-column footer-column-logo">
				<a href="https://www.jackhenry.com" target="_blank">
					<object type="image/svg+xml" data="/img/jh-logo-dark.svg" class="footer-logo">
						<img src="/img/jh-logo-dark.png" alt="Jack Henry &amp; Associates logo">
					</object>
				</a>
			</div>

			<section class="footer-column">
				<h3>Company</h3>
				<ul>
					<li><a href="/jobs">Jobs</a></li>
					<li><a href="/who-is-banno/">About Banno™</a></li>
					<li><a href="/customers/">Customers</a></li>
				</ul>
			</section>

			<section class="footer-column">
				<h3>Resources</h3>
				<ul>
					<li><a href="/features">Feature list</a></li>
					<li><a href="https://banno.com/a/help">User guides</a></li>
					<li><a href="/demo-app">Demo app</a></li>
				</ul>
			</section>

			<section class="footer-column">
				<h3>Community</h3>
				<ul>
					<li><a href="https://github.com/banno" target="_blank">GitHub</a></li>
					<li><a href="https://www.linkedin.com/company/banno" target="_blank">LinkedIn</a></li>
					<li><a href="https://twitter.com/bannoJHA" target="_blank">Twitter</a></li>
				</ul>
			</section>

		</div>
		<p class="copyright">© 2019 Jack Henry &amp; Associates.<br> <a href="http://www.jackhenry.com/more-from-jha/pages/terms-and-conditions.aspx" target="_blank">Terms and Conditions</a> | <a href="http://www.jackhenry.com/more-from-jha/pages/privacy-policy.aspx" target="_blank">Privacy Policy</a></p>
	</div>`))
            .toEqual('https://twitter.com/bannoJHA')
    })
})