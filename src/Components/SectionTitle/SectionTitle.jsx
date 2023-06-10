const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto text-center md:w-4/12 mb-8 mt-14">
            <p className="text-[#7E1263] font-medium mb-2 capitalize">
                {subHeading}
            </p>
            <h3 className="text-3xl text-[#0F2A5A] uppercase font-bold py-2">
                {heading}
            </h3>
        </div>
    );
};

export default SectionTitle;
