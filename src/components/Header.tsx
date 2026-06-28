type HeaderProps = {
  activeView: string;
  onChangeView: (view: string) => void;
};

const navItems = ["Dashboard", "Collection", "Identify", "Add Manual"];

export function Header({ activeView, onChangeView }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">LEGO Minifigure Collection</p>
        <h1>MinifigVault</h1>
      </div>

      <nav className="nav-tabs">
        {navItems.map((item) => (
          <button
            key={item}
            className={activeView === item ? "nav-tab active" : "nav-tab"}
            onClick={() => onChangeView(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
}