const MenuModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#14243DE6]/30 p-5"
      onClick={onClose}
    >
      <button
        className="absolute right-5 top-1 z-10 text-white"
        onClick={onClose}
        aria-label="Stäng meny"
        style={{ fontSize: "64px" }}
      >
        &times;
      </button>

      <ul
        id="menu-main"
        className="menu cf flex h-full w-full flex-col items-center justify-center space-y-10"
        style={{
          padding: "12% 0 0",
          margin: 0,
          background: "rgba(20, 36, 61, .9)",
          height: "100vh",
          width: "100%",
          position: "absolute",
        }}
      >
        <li className="menu-item menu-item-has-children">
          <ul className="sub-menu">
            <li className="menu-item mb-3">
              <a
                href="https://convertor.se/"
                className="text-white font-font-medium text-sm leading-loose w-full text-center py-2 "
              >
                START
              </a>
            </li>
            <li className="menu-item mb-3">
              <a
                href="https://convertor.se/kundcase/"
                className="text-white font-medium text-sm leading-loose w-full text-center py-2"
              >
                CASE
              </a>
            </li>
            <li className="menu-item mb-3">
              <a
                href="https://convertor.se/kontakt/"
                className="text-white font-medium text-sm leading-loose w-full text-center py-2"
              >
                KONTAKT
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default MenuModal;
