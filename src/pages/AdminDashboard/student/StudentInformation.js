import { TabPanel, TabView } from 'primereact/tabview';
import React, { useMemo } from 'react';
import StudentProfile from './StudentProfile';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { getUserInfo } from '~/api/user/UserService';
import StudentSectionManagement from './StudentSectionManagement';

const QueryKey = 'User-Info';

const StudentInformation = () => {
    const { id: idString } = useParams();
    const id = useMemo(() => {
        return !!idString ? parseInt(idString) : null;
    }, [idString]);

    const { data: userData } = useQuery([QueryKey, getUserId()], () => getUserInfo(getUserId(), id), {
        enabled: !!getUserId() && !!id,
    });

    return (
        <React.Fragment>
            <div className="col-12 text-primary">
                <h2 className="border-bottom-2 border-primary w-max">THÔNG TIN SINH VIÊN</h2>
            </div>
            <div className="col-12">
                <TabView defaultChecked>
                    <TabPanel header="Thông tin chung">
                        <div className="w-full">
                            <StudentProfile data={{ ...userData }} />
                        </div>
                    </TabPanel>
                    <TabPanel header="Thông tin học phần đăng ký">
                        <div className="w-full">
                            <StudentSectionManagement />
                        </div>
                    </TabPanel>
                    <TabPanel header="Thông tin học phí">
                        <p className="m-0">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                            cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
                            est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
                            libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </TabPanel>
                </TabView>
            </div>
        </React.Fragment>
    );
};
export default StudentInformation;
