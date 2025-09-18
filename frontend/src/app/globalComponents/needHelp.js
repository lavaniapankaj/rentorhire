"use client";
import styles from './css/needHelp.module.css';
import Image from "next/image";

 
export default function NeedHelp() {

    return (
        <>
    <div className={`container`}>
      <div className={styles.help_wrap}>
        <div className={`d-flex justify-content-center align-items-center ${styles.help_svg}`}>
          <Image
            src="https://webcarelogics.com/lokesh/assets/images/help.svg"
            alt="Help"
            width={80}
            height={80}
          />
        </div>

        <div className={styles.hep_heading}>
          <h3 className={`text-center ${styles.second_heading}`}>Need help ?</h3>
        </div>

        <div className={styles.help_abot}>
          <p className={`mb-0 text-center ${styles.global_heading} ${styles.gray_global_heading} ${styles.media_desc}`}>
            We strive to provide exceptional customer service and support.
            Whether you have questions.
          </p>
        </div>

        <div className={`mt-4 ${styles.help_btnwrap}`}>
          <div className={`d-flex align-items-center justify-content-center ${styles.top_btns}`}>
            <div className={styles.button_custom}>
              <button>Contact us</button>
            </div>
            <div className={styles.circl_btn}>
              <button>
                <svg
                  fill="none"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  id="fi_9210374"
                >
                  <g clipRule="evenodd" fill="rgb(0,0,0)" fillRule="evenodd">
                    <path d="M4 16c0-.5523.44772-1 1-1h22c.5523 0 1 .4477 1 1s-.4477 1-1 1H5c-.55228 0-1-.4477-1-1z"></path>
                    <path d="M17.2929 6.29289c.3905-.39052 1.0237-.39052 1.4142 0l9 9.00001c.3905.3905.3905 1.0237 0 1.4142l-9 9c-.3905.3905-1.0237.3905-1.4142 0s-.3905-1.0237 0-1.4142l8.2929-8.2929-8.2929-8.29289c-.3905-.39053-.3905-1.02369 0-1.41422z"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    );

}