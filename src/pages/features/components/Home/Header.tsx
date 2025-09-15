
const Header = () => {
  return (
    <section className="w-8/12 flex flex-col lg:flex-row justify-between ">
      <div>
        <h1 className="text-2xl font-semibold text-[#2D2F30] mb-3">
          Welcome, Benson!
        </h1>
        <p className="text-gray-600 mb-8">
          Your back office to manage class activities, students and keep things{" "}
          <br />
          running.
        </p>
      </div>
      <div>
        <h1 className="text-base font-semibold text-[#2D2F30] mb-3">Jump To</h1>
        <span className="flex flex-col lg:flex-row gap-x-6 gap-y-2 cursor-pointer">
          <p className="primary-text ">Add user</p>
          <div className="w-px h-6 bg-gray-300"></div>
          <p className="primary-text">Create assessment</p>
        </span>
      </div>
    </section>
  );
};

export default Header;
