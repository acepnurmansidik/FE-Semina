const Thead = ({ texts }) => {
  return (
    <thead className="thead-dark">
      <tr>
        {texts.map((text, i) => {
          return <th key={i}>{text}</th>;
        })}
      </tr>
    </thead>
  );
};

export default Thead