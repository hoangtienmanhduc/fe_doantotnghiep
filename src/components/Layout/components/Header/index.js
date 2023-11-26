import images from '~/assets/images';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCaretDown, faHouseChimney, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        title: 'Thông tin cá nhân',
    },
    {
        title: 'Đổi mật khẩu',
        to: '/search',
    },
    {
        title: 'Đăng xuất',
        to: '/login',
    },
];

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.Logo} alt="Logo"></img>
                </div>
                <div className={cx('search')}>
                    <input placeholder="Tìm kiếm ..." spellCheck={false} />
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div className={cx('actions')}>
                    <Button to="/" text leftIcon={<FontAwesomeIcon icon={faHouseChimney} />}>
                        Trang chủ
                    </Button>
                    <Button text leftIcon={<FontAwesomeIcon icon={faBell} />}>
                        Tin tức
                    </Button>
                    <Menu items={MENU_ITEMS}>
                        <button className={cx('more-btn')}>
                            <Image
                                src="https://i.imgur.com/FnS0hfi.jpg"
                                className={cx('user-avata')}
                                alt="name"
                                // fallback="https://tcct.aicmscdn.net/tcct-media/20/2/5/ronaldo-mu.jpg"
                            />
                            <p className={cx('name')}>Hoàng Tiến Mạnh Đức</p>
                            <FontAwesomeIcon
                                style={{ marginLeft: '5px', color: 'rgba(68, 71, 74, 0.867)', fontSize: '12' }}
                                icon={faCaretDown}
                            />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
