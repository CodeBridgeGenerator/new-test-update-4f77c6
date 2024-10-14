import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleSubjectsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("subjects")
            .get(urlParams.singleSubjectsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Subjects", type: "error", message: error.message || "Failed get subjects" });
            });
    }, [props,urlParams.singleSubjectsId]);


    const goBack = () => {
        navigate("/subjects");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Subjects</h3>
                </div>
                <p>subjects/{urlParams.singleSubjectsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Subject ID</label><p className="m-0 ml-3" >{Number(_entity?.subjectId)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Subject Name</label><p className="m-0 ml-3" >{_entity?.subjectName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Teacher ID</label><p className="m-0 ml-3" >{Number(_entity?.teacherId)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Credits</label><p className="m-0 ml-3" >{Number(_entity?.credits)}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleSubjectsPage);
