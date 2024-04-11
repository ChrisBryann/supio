import Revivsome_SM_WB from "@/public/images/revivsome_sm_wb.jpg";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20 grid lg:grid-cols-2 items-center">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Rejuvenate Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Skin
              </span>{" "}
              With State-of-The-Art Biotechnology
            </h1>
            <div className="max-w-3xl mx-auto">
              {/* <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p> */}
              <div
                className="max-w-xss mx-auto sm:max-w-nonee sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <a
                    className="btn text-white bg-blue-700 hover:bg-blue-600 w-full mb-4 sm:w-auto sm:mb-0"
                    href="#0"
                  >
                    Shop Now
                  </a>
                </div>
                {/* <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
                </div> */}
              </div>
            </div>
          </div>
          <Image
            className="md:max-w-noneee mx-auto rounded"
            src={Revivsome_SM_WB}
            width={450}
            height="462"
            alt="revivsome_sm"
            data-aos="zoom-y-out"
          />
        </div>
      </div>
    </section>
  );
}
