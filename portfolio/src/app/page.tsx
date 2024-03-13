import Project from "./lib/Project";
import Card from "./components/Card";
import Image from 'next/image'
import styles from "./page.module.css";
import projectsJson from "./projects.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faShirt, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const projects = projectsJson as Project[];

  return (
    <>
      <header className={styles.header}>
        <Image className={styles.logo} src="/logo.png" alt="Elijah Cirioli logo" width="551" height="316"/>
        <h1>elijah<span className={styles.greenText}>cirioli</span></h1>
        <div className={styles.aboutWrap}>
          <img className={styles.aboutImage} src="/landing/portrait.jpg" />
          <p className={styles.aboutText}>
            Hello, I'm a full-stack software engineer from Portland, Oregon. I'm currently studying
            computer science at the Oregon State University Honors College.
          </p>
        </div>
        <nav className={styles.nav}>
          <a className={styles.navLink}>
            <FontAwesomeIcon icon={faGithub} />
            <p className={styles.navLinkTitle}>GitHub</p>
          </a>
          <a className={styles.navLink}>
            <FontAwesomeIcon icon={faLinkedin} />
            <p className={styles.navLinkTitle}>LinkedIn</p>
          </a>
          <a className={styles.navLink}>
            <FontAwesomeIcon icon={faFileLines} />
            <p className={styles.navLinkTitle}>Résumé</p>
          </a>
          <a className={styles.navLink}>
            <FontAwesomeIcon icon={faEnvelope} />
            <p className={styles.navLinkTitle}>Email</p>
          </a>
          <a className={styles.navLink}>
            <FontAwesomeIcon icon={faShirt} />
            <p className={styles.navLinkTitle}>Store</p>
          </a>
        </nav>
      </header>
      <main className={styles.cardsWrap}>
        {projects.map(project => Card({project}))}
      </main>
    </>
  );
}
