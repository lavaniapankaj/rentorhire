"use client";
import styles from './css/heroSection.module.css';

export default function HeroSection() {

    return (
        <>
            <div className={` ${styles.main_heading} mb-4`}>This will be the hero section.</div>
            <div class="prouct_hero_inner">
            <div class="prouct_hero">
                <div class="container ">
                    <div class="Zindex">
                        <div class="hero_heading">
                            <h1 class="image" data-wow-duration="2s">Find the Perfect Vehicle for<br/> Any Trip </h1>
                        </div>
                        <p data-wow-duration="2s" class="hero_description image global_heading">Browse bikes, scooters, and cars available nearby from trusted local providers.</p>
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="d-flex align-items-center justify-content-between hero_btns gap-3">
                                <div class="extrabtn"><button>Search Vehicles</button></div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="button_custom"><button>List Your Vehicle</button></div>
                                    <div class="circl_btn">
                                        <button><svg fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" id="fi_9210374"><g clip-rule="evenodd" fill="rgb(0,0,0)" fill-rule="evenodd"><path d="m4 16c0-.5523.44772-1 1-1h22c.5523 0 1 .4477 1 1s-.4477 1-1 1h-22c-.55228 0-1-.4477-1-1z"></path><path d="m17.2929 6.29289c.3905-.39052 1.0237-.39052 1.4142 0l9 9.00001c.3905.3905.3905 1.0237 0 1.4142l-9 9c-.3905.3905-1.0237.3905-1.4142 0s-.3905-1.0237 0-1.4142l8.2929-8.2929-8.2929-8.29289c-.3905-.39053-.3905-1.02369 0-1.41422z"></path></g></svg></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container custom_searchbar_wrap">
                            <div class="custom_searchbar ">
                                <form class="w-100" action="#" method="post">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-6 col-12 border_rightF1">
                                            <div class="loc_block_inner h-100">

                                                <div class="form-group w-100">
                                                    <label for="location">Location</label>
                                                    <div class="location_in_wrap">
                                                        <input class="w-100" id="location" type="search" placeholder="Enter your destination..." name="" />
                                                        <img src="https://webcarelogics.com/lokesh/assets/images/pin.svg"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-12 border_rightF2">
                                            <div class="cat_block_inner h-100">
                                                <div class="form-group w-100">
                                                    <label class="category_label" for="category">Vehicle Type</label>
                                                    <div class="category_in_wrap">
                                                        <select id="category" class="category_select text-muted w-100">
		                              <option value="Bike">Bike</option>
		                              <option value="Car">Car</option>
                                      <option value="Scooty">Scooty</option>
		                            </select>
                                                        <img class="toggle-icon" src="https://webcarelogics.com/lokesh/assets/images/down.svg" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-4 col-md-8 col-12 ">
                                            <div class="search_block_wrap h-100">
                                                <div class="search_block_inner rounded-pill">
                                                    <div class="w-100">
                                                        <label f="" class="whatoftype" for="whatoftype">Search Rentals</label>
                                                        <input id="whatoftype" class="rounded-pill w-100" type="search" placeholder="Enter something..." name="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-12 col-12 searchbtn1">
                                            <div class="rent_search_btn h-100">
                                                <button class="button theme-btn" type="submit">
		                          {/* <!-- <span>Search</span> --> */}
		                          
		                        </button>
                                            </div>
                                        </div>
                                        {/* <!-- <div class="col-lg-1 col-md-2 col-2 searchbtn2">
		                      <div class="filter_btn h-100">
		                        <img src="https://webcarelogics.com/lokesh/assets/images/filter.svg">
		                      </div>
		                    </div> --> */}
                                    </div>
                                </form>
                            </div>
                            <div class="advance_filter_wrap">
                                <div class="inner_advance advance_filter_inner">
                                    <h5 class="text-muted border-bottom pb-1">Advance Filter</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}