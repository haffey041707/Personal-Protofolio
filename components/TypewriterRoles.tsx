"use client";

import { useEffect, useState } from "react";

export function TypewriterRoles({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const doneTyping = !deleting && visible === current;
    const doneDeleting = deleting && visible === "";
    const delay = doneTyping ? 1200 : deleting ? 34 : 62;

    const timeout = window.setTimeout(() => {
      if (doneTyping) {
        setDeleting(true);
        return;
      }

      if (doneDeleting) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
        return;
      }

      setVisible((text) =>
        deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
      );
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, roleIndex, roles, visible]);

  return (
    <span className="text-plasma">
      {visible}
      <span className="ml-1 inline-block h-6 w-0.5 translate-y-1 bg-aurora" />
    </span>
  );
}
