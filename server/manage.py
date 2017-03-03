# coding: utf-8
import argparse

from app.app import run
from app.models import check_tables


def main():
    parser = argparse.ArgumentParser()
    sub_parser = parser.add_subparsers(dest='cmd')
    sub_parser.add_parser('runserver')
    sub_parser.add_parser('createtables')

    args = parser.parse_args()

    if args.cmd == 'runserver':
        check_tables()
        run()


if __name__ == '__main__':
    main()
