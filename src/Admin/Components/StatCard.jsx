const StatCard = ({ label, count, icon: Icon, cardBg, iconBg, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl shadow-sm p-5 flex items-center justify-between ${cardBg} hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer`}
    >
      <div>
        <p className="text-gray-600 text-base font-medium">{label}</p>
        <h3 className="text-4xl font-bold text-gray-800 mt-1">{count}</h3>
      </div>

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon className="text-3xl text-white" />
      </div>
    </div>
  );
};

export default StatCard;