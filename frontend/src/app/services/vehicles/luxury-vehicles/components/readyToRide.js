"use client";
import styles from '../../luxury-vehicles/components/readyToRide.module.css';
import Image from "next/image";


export default function ReadyToRide() {

    return (
        <>
            <section className={`roh_singlePost_wrap`}>
                <div className={`${styles.roh_singlePost_wrap_inner} ${styles.roh_global_padding}`}>
                    <div className={`${styles.roh_singlePost_main} ${styles.roh_singlePost_black_bg}`}>
                        <div className={`container`}>
                            <div className={`row`}>
                                <div className={`col-12 col-md-6 col-lg-6`}>
                                    <div className={`${styles.roh_singlePost_content}`}>
                                        <h3 className={`text-white mb-0 ${styles.roh_second_heading}`}>Ready to ride?<br /> Book your car today !</h3>
                                        <p className={`text-white mb-0 ${styles.roh_global_heading} ${styles.roh_singlePost_desc}`}>Our friendly customer service team is here to help. Contact us anytime for support and inquiries.</p>
                                        <div className={`d-flex align-items-center justify-content-start ${styles.roh_top_btns}`}>
                                            <div className={`${styles.roh_button_custom}`}><button>Contact us</button></div>
                                            <div className={`${styles.roh_circl_btn}`}>
                                                <button><Image src="/arrow.svg" alt="Arrow Right" width={30} height={30} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-12 col-md-6 col-lg-6`}>
                                    <div className={`${styles.roh_singlePost_imgwrap}`}>
                                        <Image src="/cta-car-img.png" alt='CTA Car' width={550} height={270} style={{ width: '100%', height: 'auto' }} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}