#!/usr/bin/env python3

import pathlib
import shutil

max_library = pathlib.Path.home() / "Documents" / "Max 8" / "Library"

pendulum_poly = "pendulum-poly.maxpat"
dpend_max = "dpend_max.js"


def install_pendulum_poly():
    assert (
        pathlib.Path.cwd() / pendulum_poly
    ).exists(), f"File {pendulum_poly} does not exist"
    assert max_library.exists(), f"Directory {max_library} does not exist"

    poly_folder = max_library / "poly~"
    assert poly_folder.exists(), f"Directory {poly_folder} does not exist"

    shutil.copy(pathlib.Path.cwd() / pendulum_poly, poly_folder / pendulum_poly)
    print(f"Installed {pendulum_poly} to {poly_folder}")


def install_dpend_max():
    assert (pathlib.Path.cwd() / dpend_max).exists(), f"File {dpend_max} does not exist"
    assert max_library.exists(), f"Directory {max_library} does not exist"

    txt_folder = max_library / "text"
    assert txt_folder.exists(), f"Directory {txt_folder} does not exist"

    shutil.copy(pathlib.Path.cwd() / dpend_max, txt_folder / dpend_max)
    print(f"Installed {dpend_max} to {txt_folder}")


if __name__ == "__main__":
    try:
        install_pendulum_poly()
        install_dpend_max()
    except Exception as e:
        print("Error Installing Max Patches.", e)
