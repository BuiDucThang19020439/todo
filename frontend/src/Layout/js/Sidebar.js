import "../css/Sidebar.css";
import "../../css/icon.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Sidebar() {
  const isExtraSmall = useMediaQuery({ query: "(max-width: 388px)" });
  const isSmall = useMediaQuery({
    query: "(min-width: 389px) and (max-width: 575px)",
  });
  const isMedium = useMediaQuery({
    query: "(min-width: 576px) and (max-width: 767px)",
  });
  const isLarge = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 992px)",
  });
  const isExtraLarge = useMediaQuery({ query: "(min-width: 993px)" });
  /**
   * isSidebarCollapsed dùng để đóng mở sidebar
   * setSidebarCollapsed đặt giá trị true false cho việc đóng mở
   * câu điều kiện dùng để thay đổi --sidebar-width lấy từ https://youtu.be/OMzuo7MOS2I?si=DlPZoWNSse25pEi4
   */
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSibarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const openSidebar = () => {
    setIsSidebarCollapsed(false);
  };
  const closeSidebar = () => {
    setIsSidebarCollapsed(true);
  };

  let sidebarWidth = document.querySelector(":root");

  useEffect(() => {
    if (isExtraSmall || isSmall) {
      sidebarWidth.style.setProperty("--sidebar-width", "68px");
      closeSidebar();
    }
  }, [isExtraSmall, isSmall]);

  function setSidebarCollapsed() {
    toggleSibarCollapse();
    !isSidebarCollapsed
      ? sidebarWidth.style.setProperty(
          "--sidebar-width",
          "var(--sidebar-collapsed-width)"
        )
      : sidebarWidth.style.setProperty(
          "--sidebar-width",
          "var(--sidebar-expanded-width)"
        );
  }

  return (
    <div className="sidebar">
      {!isSidebarCollapsed && (
        <div className="extend-sidebar">
          <div className="head-sidebar">
            <Link to="/">
              <Button className="button-icon button-icon-home-icon">
                <ion-icon name="home-sharp" size="large"></ion-icon>
              </Button>
            </Link>
          </div>
          <div className="sidebar-route">
            <Link to="/" className="sidebar-item">
              <Button className="button-nav-item">
                Trang chủ
                <ion-icon name="home-sharp"></ion-icon>
              </Button>
            </Link>
            <Link to="/TodoList" className="sidebar-item">
              <Button className="button-nav-item">
                TodoList
                <ion-icon name="list"></ion-icon>
              </Button>
            </Link>
            <Link to="/userInfo" className="sidebar-item">
              <Button className="button-nav-item">
                Thông tin
                <ion-icon name="information-circle-sharp"></ion-icon>
              </Button>
            </Link>
          </div>
          <div>
            <Button
              type="button"
              className="button-icon button-icon-sidebar-collapse"
              onClick={setSidebarCollapsed}
            >
              <ion-icon name="chevron-back" size="large"></ion-icon>
            </Button>
          </div>
        </div>
      )}

      {isSidebarCollapsed && (
        <div className="collapsed-sidebar">
          <div className="head-sidebar">
            <Link to="/">
              <Button className="button-icon button-icon-home-icon">
                <ion-icon name="home-sharp" size="large"></ion-icon>
              </Button>
            </Link>
          </div>

          <div className="sidebar-route">
            <Link to="/" className="sidebar-item">
              <Button className="button-nav-item">
                <ion-icon name="home-sharp"></ion-icon>
              </Button>
            </Link>
            <Link to="/TodoList" className="sidebar-item">
              <Button className="button-nav-item">
                <ion-icon name="list" size=""></ion-icon>
              </Button>
            </Link>
            <Link to="/userInfo" className="sidebar-item">
              <Button className="button-nav-item">
                <ion-icon name="information-circle-sharp"></ion-icon>
              </Button>
            </Link>
          </div>
          {!isSmall && !isExtraSmall && (
            <div>
              <Button
                type="button"
                className="button-icon button-icon-sidebar-expand"
                onClick={setSidebarCollapsed}
              >
                <ion-icon name="chevron-forward" size="large"></ion-icon>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
