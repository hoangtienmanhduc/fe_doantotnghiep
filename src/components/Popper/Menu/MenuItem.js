import { Button } from 'primereact/button';

function MenuItem({ data }) {
    return (
        <div className="p-2 col-12">
            <Button
                label={data.title}
                text
                onClick={() => {
                    if (!!data?.command) {
                        data.command();
                    }
                    window.location.assign(data.to);
                }}
                className="w-full text-left"
            />
        </div>
    );
}

export default MenuItem;
