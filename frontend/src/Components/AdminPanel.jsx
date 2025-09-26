import { Eye, FolderPen, Image } from "lucide-react";

function AdminPanel() {
    function setSelectedTab(e) {
        let divs = document.querySelectorAll(".selectable");
        let target = e.target;
        if (!divs || !target) return;

        divs.forEach(div => {
            if (div !== target) {
                div.classList.remove("selected");
            } else if (!target.classList.contains("selected")) {
                target.classList.add("selected")
            }
        });
    }


    return (
        <>
        <div className="page-width flex flex-col">
            <div id="switchable" className="flex-row gap-5 flex-justifyCenter h-10 items-center gray-bg mt-5 mb-5 border-styling">
                <div className="selectable selected" onClick={setSelectedTab}>Questions</div>
                <div className="selectable" onClick={setSelectedTab}>Users</div>
                <div className="selectable" onClick={setSelectedTab}>Analytics</div>
            </div>

            <div id="infoCard" className="flex flex-col bg-white p-5 mt-5 mb-5 border-styling">
                <div className="title">this is the title</div>
                <div className="subTitle">this is a subtitle</div>
                
                <div className="card">
                    <div className="userCard flex justify-between">
                        <div className="userInfo flex flex-row gap-5">
                            <div className="image flex items-center">
                                <Image />
                            </div>
                            <div className="flex-justifyCenter flex-col">
                                <div className="userName">exampleName</div>
                                <div className="userMail">example@mail.com</div>
                                <div className="userJoined">99-99-9999</div>
                            </div>
                        </div>

                        <div className="actions flex items-center gap-5">
                            <div className="gameData">
                                <div className="flex-justifyCenter">99</div>
                                <div>Games</div>
                            </div>

                            <div className="gameScore">
                                <div className="flex-justifyCenter">99</div>
                                <div>Score</div>
                            </div>

                            <button className="btn border-styling gray-bg"><Eye /></button>
                            <button className="btn border-styling gray-bg"><FolderPen /></button>
                        </div>
                    </div>
                    <div className="quizCard"></div>
                    <div className="questionCard"></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminPanel;