function WhyHireUs() {
  return (
    <section className="why-hire-us-wrapper flex flex-row justify-between px-[6%] py-15 items-center gap-10">

      <div className="why-hire-us-images w-[45%] lg:w-[35%] md:w-[35%]">
        <div className="why-images-grid grid grid-cols-2 gap-4">

          <div className="why-img-box box-1 w-full h-45 overflow-hidden cursor-pointer" style={{ borderRadius: '23px 23px 0 23px' }}>
            <img src="/images/why-1.jpg" alt="Designer smiling" className="w-full h-full object-cover" />
          </div>

          <div className="why-img-box box-2 w-full h-45 overflow-hidden cursor-pointer" style={{ borderRadius: '23px 23px 23px 0' }}>
            <img src="/images/why-2.jpg" alt="Team working" className="w-full h-full object-cover" />
          </div>

          <div className="why-img-box box-3 w-full h-45 overflow-hidden cursor-pointer" style={{ borderRadius: '23px 0 23px 23px' }}>
            <img src="/images/why-3.jpg" alt="Designer at desk" className="w-full h-full object-cover" />
          </div>

          <div className="why-img-box-circle w-45 h-45 overflow-hidden cursor-pointer rounded-full mx-auto">
            <img src="/images/why-4.jpg" alt="Creative workspace" className="w-full h-full object-cover" />
          </div>

        </div>
      </div>

      <div className="why-hire-us-content w-[50%]">
        <h2 className="text-[30px] font-bold text-[#2e2e2e] uppercase mb-6">
          Why <span className="text-[#e53935]">You</span> Should <span className="text-[#e53935]">Hire</span> Us?
        </h2>
        <p className="text-[#727171] text-[17px] leading-[1.85]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>

    </section>
  )
}

export default WhyHireUs