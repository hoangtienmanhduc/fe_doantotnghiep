import { TabPanel, TabView } from 'primereact/tabview';
import React, { useMemo } from 'react';
import StudentProfile from './StudentProfile';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { getUserInfo } from '~/api/user/UserService';
import StudentSectionManagement from './StudentSectionManagement';
import StudentTuition from './StudentTuition';

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
                        <div className="w-full">
                            <StudentTuition />
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </React.Fragment>
    );
};
export default StudentInformation;
