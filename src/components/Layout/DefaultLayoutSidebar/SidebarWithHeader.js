import { UserRoles } from '~/App';
import Header from '~/components/Layout/components/Header/Header';
import MenuSidebar from '~/components/MenuSidebar/MenuSidebar';
import { getUserRole } from '~/components/authentication/AuthUtils';
import SidebarLecturer from '../DefaultLayoutLecturer/SidebarLecturer';

function DefaultLayoutSidebar({ children }) {
    return (
        <div>
            <Header />
            <div className="flex col-12 justify-content-center aling-items-center overflow-x-auto">
                {getUserRole() !== UserRoles.ADMIN && (
                    <div className="col-2 border-1 border-300 border-round-md">
                        {getUserRole() === UserRoles.STUDENT ? (
                            <MenuSidebar />
                        ) : getUserRole() === UserRoles.LECTURER ? (
                            <SidebarLecturer />
                        ) : (
                            ''
                        )}
                    </div>
                )}
                <div className={`${getUserRole() === UserRoles.ADMIN ? 'col-12' : 'col-10'}`}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayoutSidebar;
