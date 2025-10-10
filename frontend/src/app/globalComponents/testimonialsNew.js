"use client";
// import Slider from "react-slick";
import Image from "next/image";
import "./css/testimonialsNew.module.css";

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3, // 3 cards visible on desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 992, // tablets
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const testimonials = [
    {
      id: 1,
      name: "Ritu S., Jaipur",
      role: "Project Manager",
      text: "Booked a Scooty in Jaipur — smooth experience and great pricing.",
      img: "/images/user1.jpg",
    },
    {
      id: 2,
      name: "Sneha T., Pune",
      role: "Project Manager",
      text: "Quick pickup and clean bike — definitely recommend.",
      img: "/images/user2.jpg",
    },
    {
      id: 3,
      name: "Arjun K., Delhi",
      role: "Sales Executive",
      text: "Booked a car for 2 days — smooth process and well-maintained vehicle.",
      img: "/images/user3.jpg",
    },
    {
      id: 4,
      name: "Karan P., Mumbai",
      role: "Developer",
      text: "Affordable and reliable car rental service. Highly recommended.",
      img: "/images/user4.jpg",
    },
  ];

  return (
    <section className={styles.testimonial_wrap}>
      <div className="container py-5">
        <div className={styles.testimonial_wrap_main}>
          <div className="text-center mb-4">
            <div className={styles.star_box}>
              <Image
                src="/images/homepg/star.svg"
                alt="star"
                width={20}
                height={20}
              />
              <span className={styles.star_title}>Testimonials</span>
            </div>
            <h3 className={`mt-3 ${styles.second_heading}`}>
              What our customers are <br /> saying about us
            </h3>
          </div>

          <Slider {...settings}>
            {testimonials.map((item) => (
              <div key={item.id} className={`p-3`}>
                <div className={`card ${styles.fleetscard}`}>
                  <div className="card-body">
                    <div className={styles.ratings}>
                      <Image
                        src="/images/rating.png"
                        alt="rating"
                        width={100}
                        height={20}
                      />
                    </div>
                    <p
                      className={`mb-3 ${styles.testimonial_desc} ${styles.gray_global_heading}`}
                    >
                      {item.text}
                    </p>
                    <div className={styles.testimonial_profile_wrap}>
                      <div className={styles.user_image}>
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className={styles.profile_data}>
                        <strong className={styles.author_name}>
                          {item.name}
                        </strong>
                        <span
                          className={`${styles.author_desc} ${styles.gray_global_heading}`}
                        >
                          {item.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
