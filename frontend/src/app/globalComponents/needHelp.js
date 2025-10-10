"use client";
import Link from "next/link";
import "../globals.css";
import styles from './css/needHelp.module.css';
import Image from "next/image";

 
export default function NeedHelp() {

    return (
        <>
    <div className={`container`}>
      <div className={styles.help_wrap}>
        <div className={`d-flex justify-content-center align-items-center ${styles.help_svg}`}>
          <Image
            src="/help.svg"
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
          <div className={`d-flex align-items-center justify-content-center roh_redBtns`}>
            <div className={`roh_button_custom`}>
              <Link href="#">Contact us</Link>
            </div>
            <div className={`roh_circl_btn`}>
            <Link href="#"><Image src="/arrow.svg" alt="Arrow Right" width={30} height={30} /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    );

}