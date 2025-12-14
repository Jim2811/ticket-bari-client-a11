import Marquee from "react-fast-marquee";
import BimanBangla from "../../assets/Partners/biman-bangla.png"
import Greenline from "../../assets/Partners/greenline.png"
import Rail from "../../assets/Partners/bangladesh-railway.png"
import Pathao from "../../assets/Partners/pathao.png"
import Uber from "../../assets/Partners/uber.png"
const Partners = () => {
    const partner = [
        BimanBangla,
        Greenline,
        Rail,
        Pathao,
        Uber
    ]
  return (
    <section className="py-12">
      <div className=" mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
          Our Partners
        </h2>

        <Marquee pauseOnHover={true} speed={50} gradient={false}>
            {
                partner.map((p, index) => <div className="flex items-center space-x-12" key={index}>
            <img
              src= {p}
              className="h-16 px-10"
            />
          </div>)
            }
          
        </Marquee>
      </div>
    </section>
  );
};

export default Partners;
