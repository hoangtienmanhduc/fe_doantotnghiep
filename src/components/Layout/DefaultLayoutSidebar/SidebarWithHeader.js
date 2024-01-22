import Header from '~/components/Layout/components/Header/Header';
import MenuSidebar from '~/components/MenuSidebar/MenuSidebar';

function DefaultLayoutSidebar({ children }) {
    return (
        <div>
            <Header />
            <div className="flex col-12 justify-content-center aling-items-center overflow-x-auto">
                <div className="col-2">
                    <MenuSidebar />
                </div>
                <div className="col-10">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayoutSidebar;
