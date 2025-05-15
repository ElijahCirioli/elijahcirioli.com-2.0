import Logo from "@/components/Logo";
import SettingsMenu from "@/components/SettingsMenu";
import styles from "./HeaderNavBar.module.css";

const HeaderNavBar: React.FC = () => {
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
