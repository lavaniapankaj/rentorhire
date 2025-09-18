"use client";
import styles from './css/heroSection.module.css';

export default function HeroSection() {

    return (
        <>
            <div className={styles.prouct_hero_wrap}>
      <div className={styles.prouct_hero_inner}>
        <div className={styles.prouct_hero}>
          <div className={`container`}>
            <div className={styles.Zindex}>
              <div className={styles.hero_heading}>
                <h1  data-wow-duration="2s">
                  Find the Perfect Vehicle for <br /> Any Trip
                </h1>
              </div>
              <p
                data-wow-duration="2s"
                className={`${styles.hero_description} ${styles.global_heading}`}>
                Browse bikes, scooters, and cars available nearby from trusted
                local providers.
              </p>

              <div className={`d-flex justify-content-center align-items-center`}>
                <div className={`d-flex align-items-center justify-content-between  gap-3 ${styles.hero_btns}`}>
                  <div className={styles.extrabtn}>
                    <button>Search Vehicles</button>
                  </div>

                  <div className={`d-flex align-items-center justify-content-between`}>
                    <div className={styles.button_custom}>
                      <button>List Your Vehicle</button>
                    </div>
                    <div className={styles.circl_btn}>
                      <button>
                        <svg
                          fill="none"
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          id="fi_9210374"
                        >
                          <g
                            clipRule="evenodd"
                            fill="rgb(0,0,0)"
                            fillRule="evenodd"
                          >
                            <path d="m4 16c0-.5523.44772-1 1-1h22c.5523 0 1 .4477 1 1s-.4477 1-1 1h-22c-.55228 0-1-.4477-1-1z"></path>
                            <path d="m17.2929 6.29289c.3905-.39052 1.0237-.39052 1.4142 0l9 9.00001c.3905.3905.3905 1.0237 0 1.4142l-9 9c-.3905.3905-1.0237.3905-1.4142 0s-.3905-1.0237 0-1.4142l8.2929-8.2929-8.2929-8.29289c-.3905-.39053-.3905-1.02369 0-1.41422z"></path>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
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