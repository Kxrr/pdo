# coding: utf-8
import argparse

from app import app


def main():
    parser = argparse.ArgumentParser()
    sub_parser = parser.add_subparsers(dest='cmd')
    sub_parser.add_parser('runserver')

    args = parser.parse_args()

    if args.cmd == 'runserver':
        app.run(port=8000)


if __name__ == '__main__':
    main()
