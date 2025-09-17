"use client";
import styles from './css/innerServices.module.css';
import Image from "next/image";


export default function InnerServices() {

    return (
        <>
            <section className={`${styles.roh_explore_wrap}`}>
        <div className={`${styles.roh_explore_wrap_inner}`}>
            <div className={`${styles.roh_explore_wrap_main}`}>
                <div className={`d-flex justify-content-center align-items-center`}>
                    <div className={`roh_star_box`}>
                        <div className={`star_inner d-flex align-items-center gap-1`}>
                            <Image src="/images/homepg/star.svg" alt="star icon" width={19} height={17} />
                            <span className={`${styles.roh_star_title}`}>About us</span>
                        </div>
                    </div>
                </div>
                <h3 className={`${styles.roh_second_heading} text-center`}>Explore our wide range of <br/>rental services</h3>
                <div class="container mt-5">
                    <div className={`${styles.roh_main_data_wrap}`}>
                        
                            <div className={`roh_card_box`}>
                                <div className={`${styles.roh_card_box_inner}`}>
                                    <ul className={`${styles.roh_explore_media_list}`}>
                                        <li>
                                            <div className={`${styles.roh_media}`}>
                                                <div className={`roh_media_imgbox`}>
                                                    <div className={`${styles.roh_back_circle}`}>
                                                        <img src="/images/vechiclespg/checkcar.svg"/>
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <h5 className={`${styles.roh_media_title}`}>Cars </h5>
                                                    <p className={`${styles.roh_global_heading} ${styles.roh_gray_global_heading}`}>Hatchbacks, sedans, and SUVs with flexible pricing</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={`${styles.roh_circl_btn}`}>
                                        <a href="https://webcarelogics.com/lokesh/services/cars/car-type.html"><button><img src="/images/global-imgs/arrow.svg"/></button></a>
                                    </div>
                                </div>

                            </div>
                        
                            <div className={`roh_card_box`}>
                                <div className={`${styles.roh_card_box_inner}`}>
                                    <ul className={`${styles.roh_explore_media_list}`}>
                                        <li>
                                            <div className={`${styles.roh_media}`}>
                                                <div className={`roh_media_imgbox`}>
                                                    <div className={`${styles.roh_back_circle}`}>
                                                        <img src="/images/vechiclespg/allcars.svg"/>
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <h5 className={`${styles.roh_media_title}`}>Scooters </h5>
                                                    <p className={`${styles.roh_global_heading} ${styles.roh_gray_global_heading}`}>Lightweight, economical two-wheelers</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={`${styles.roh_circl_btn}`}>
                                        <button><img src="/images/global-imgs/arrow.svg"/></button>
                                    </div>
                                </div>
                            </div>
                       
                            <div className={`roh_card_box`}>
                                <div className={`${styles.roh_card_box_inner}`}>
                                    <ul className={`${styles.roh_explore_media_list}`}>
                                        <li>
                                            <div className={`${styles.roh_media}`}>
                                                <div className={`roh_media_imgbox`}>
                                                    <div className={`${styles.roh_back_circle}`}>
                                                        <img src="/images/vechiclespg/airport.svg" />
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <h5 className={`${styles.roh_media_title}`}>Bikes </h5>
                                                    <p className={`${styles.roh_global_heading} ${styles.roh_gray_global_heading}`}>Perfect for solo commutes and road trips</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={`${styles.roh_circl_btn}`}>
                                        <button><img src="/images/global-imgs/arrow.svg"/></button>
                                    </div>
                                </div>
                            </div>
                        
                            <div className={`roh_card_box`}>
                                <div className={`${styles.roh_card_box_inner}`}>
                                    <ul className={`${styles.roh_explore_media_list}`}>
                                        <li>
                                            <div className={`${styles.roh_media}`}>
                                                <div className={`roh_media_imgbox`}>
                                                    <div className={`${styles.roh_back_circle}`}>
                                                        <img src="/images/vechiclespg/driver.svg"/>
                                                    </div>
                                                </div>
                                                <div class="media-body">
                                                    <h5 class="media_title">E-bikes </h5>
                                                    <p className={`${styles.roh_global_heading} ${styles.roh_gray_global_heading}`}>Eco-friendly rides with good battery life</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={`${styles.roh_circl_btn}`}>
                                        <button><img src="/images/global-imgs/arrow.svg"/></button>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                    <div class="row pt-5">
                        <div class="col-12">
                            <p className={`${styles.roh_global_heading} ${styles.roh_explore_desc} ${styles.roh_gray_global_heading}`}>Discover our range of car rental services designed to meet all your travel needs.
                                <br/> From a diverse fleet of vehicles to flexible rental plans.</p>
                        </div>
                        <div class="col-12">
                            <div className={`${styles.roh_btn_exprore_wrap}`}>
                                <div className={`${styles.roh_top_btns} d-flex align-items-center justify-content-center`}>
                                    <div className={`${styles.roh_button_custom}`}><button>Contact us</button></div>
                                    <div className={`${styles.roh_circl_btn}`}>
                                        <button><img src="/images/global-imgs/arrow.svg"/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    );

}