import { FC } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

import styles from '../../Content/ContentParts/ProductBlock/Product.module.scss';

const DrinkSkeleton: FC<IContentLoaderProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <ContentLoader
        className={styles.productBlock}
        speed={2}
        width={280}
        height={395}
        viewBox="0 0 280 395"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={{ marginBottom: '19px' }}
        {...props}
      >
        <rect x="0" y="265" rx="15" ry="15" width="280" height="27" />
        <rect x="0" y="320" rx="15" ry="15" width="90" height="27" />
        <circle cx="140" cy="125" r="120" />
        <rect x="150" y="310" rx="25" ry="25" width="130" height="45" />
      </ContentLoader>
    </div>
  )
}

export default DrinkSkeleton;

