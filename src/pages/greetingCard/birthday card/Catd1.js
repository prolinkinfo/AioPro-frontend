import './style.css'

const BirthdayCard1 = ({name,msg}) => {
  return (
    <div className="body">
      <div className="birthdayCard">
        <div className="cardFront">
          <div className="front-text">
            <h3 className="happy">HAPPY</h3>
            <h2 className="bday">BIRTHDAY</h2>
            <h3 className="toyou">to you!</h3>
          </div>
          <div className="wrap-deco">
            <div className="decorations"/>
            <div className="decorationsTwo"/>
          </div>
          <div className="wrap-decoTwo">
            <div className="decorations"/>
            <div className="decorationsThree"/>
          </div>
          <div className="plate">
            <div className="cake"/>
            <div className="flame"/>
          </div>
        </div>

        <div className="cardInside">
          <div className="inside-text">
            <h3 className="happy">HAPPY</h3>
            <h2 className="bday">BIRTHDAY</h2>
            <h3 className="toyou">to you!</h3>
          </div>
          <div className="wishes">
            <p>Dear {name},</p>
            <p>
             {msg}
            </p>
            {/* <p className="name">jaysukh</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BirthdayCard1;
