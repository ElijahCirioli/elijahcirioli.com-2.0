import styles from "./HeaderNavBar.module.css";
import SettingsMenu from "./SettingsMenu";
import Logo from "./Logo";

const HeaderNavBar: React.FC<{}> = () => {
	return (
		<div id={styles.headerNavBar}>
			<Logo id={styles.logo} />
			<div id={styles.settingsWrap}>
				<SettingsMenu />
			</div>
		</div>
	);
};

export default HeaderNavBar;
