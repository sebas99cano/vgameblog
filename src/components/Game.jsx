import React from "react";

export const Game = () => {
    return (
        <div className="card border border-radius rounded border-dark">
            <img className="card-img-top" src="https://esports.eldesmarque.com/wp-content/uploads/2019/09/LoL2.jpg"
                 alt={""}/>
            <div className="card-body">
                <p className="card-text">league of Legends is a team strategy game in which two teams made up of five
                    powerful champions battle each other to destroy each other's base. Choose from over 140 champions to
                    make epic plays, secure kills, and destroy turrets as you advance to victory.</p>
                <p className="card-text bold">You can download it here: <a
                    href="https://signup.lan.leagueoflegends.com/es/signup/redownload">Download</a></p>
            </div>
        </div>
    )
}