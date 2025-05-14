import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { listClasses } from "@/lib/utils";
import styles from "./SettingsMenuItem.module.css";

interface SettingsMenuItemProps {
	index: number;
	text: string;
	icon: IconProp;
	visible: boolean;
	updateSetting: () => void;
}

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
	index,
	text,
	icon,
	visible,
	updateSetting,
}: SettingsMenuItemProps) => {
	return (
		<div
			className={visible ? styles.item : listClasses(styles.item, styles.hidden)}
			style={{ top: `${visible ? 50 + 44 * index : 0}px` }}
		>
			<button onClick={updateSetting}>
				<FontAwesomeIcon icon={icon} />
			</button>
			<p>{text}</p>
		</div>
	);
};

export default SettingsMenuItem;
